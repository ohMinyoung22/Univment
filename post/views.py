from django.http import Http404
from django.shortcuts import get_object_or_404
import requests
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import HttpResponse
from .models import Post, Category
from .serializers import PostSerializer, CategorySerializer
from rest_framework import generics
from rest_framework.permissions import IsAdminUser, IsAuthenticated
import json
from django.core import serializers
# Create your views here.


class PostCreate(generics.CreateAPIView):
    permission_classes = []
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class PostDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated, ]
    queryset = Post.objects.all()
    lookup_field = 'id'
    serializer_class = PostSerializer

class CategoryList(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated, ]
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    def create(self, request, *args, **kwargs):
        if not self.request.user.is_staff:
            if self.queryset.filter(generated_user=self.request.user.id).count() >= 3:
                return Response({'오류': '카테고리는 최대 3개까지만 생성 가능합니다.'}, status=status.HTTP_403_FORBIDDEN)

        if 'name' in request.data:
            if Category.objects.all().filter(name=self.request.data['name']).exists():
                if Category.objects.all().filter(name=self.request.data['name']).filter(isDefault=True).exists():
                    return Response({'오류': '기본 카테고리와 이름이 동일한 카테고리는 생성이 불가합니다.'}, status=status.HTTP_403_FORBIDDEN)

        serializer = self.get_serializer(data=self.request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data, status=status.HTTP_201_CREATED, headers=headers
        )

    def perform_create(self, serializer):
        serializer.save()

    def get_queryset(self):
        queryset1 = Category.objects.filter(isDefault=True)
        queryset2 = Category.objects.filter(generated_user=self.request.user)
        queryset = queryset1.union(queryset2)

        if 'onlyusercontent' in self.request.data:
            if self.request.data['onlyusercontent']:
                queryset = queryset2

        return queryset

    def get_permissions(self):
        if self.request.method in ['POST']:

            isDefault = self.request.data['isDefault']

            if bool(isDefault):
                self.permission_classes = [IsAdminUser, ]

        return super(CategoryList, self).get_permissions()


class CategoryDetail(APIView):
    permission_classes = [IsAuthenticated, ]
    lookup_field = 'category'
    serializer_class = PostSerializer

    def get(self, *args, **kwargs):
        data = serializers.serialize('json', Post.objects.all().filter(
            user=self.request.user.id).filter(category=self.kwargs['category']))
        return HttpResponse(data)

    def delete(self, request, *args, **kwargs):
        try:
            instance = Category.objects.all().get(id=self.kwargs['category'])
            if instance.generated_user == self.request.user:
                instance.delete()
            else:
                return Http404
        except Http404:
            pass
        return Response(status=status.HTTP_204_NO_CONTENT)

    def patch(self, request, *args, **kwargs):
        return self.put(request, args, kwargs)

    def put(self, request, *args, **kwargs):
        try:
            instance = Category.objects.all().get(id=self.kwargs['category'])
            #print("instance : " + instance.__str__())
            serializer = CategorySerializer(instance, data=self.request.data)
            #print("instance : " + serializer.__str__())
            if instance.isDefault:
                self.permission_classes = [IsAdminUser, ]
            elif instance.generated_user != self.request.user:
                return Response({'오류': '본인이 만든 카테고리만 수정 가능합니다.'}, status=status.HTTP_403_FORBIDDEN)

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
        except Http404:
            return Response({'오류': '해당 카테고리가 존재하지 않습니다.'}, status=status.HTTP_404_NOT_FOUND)

    def get_permissions(self):
        if self.request.method in ['DELETE']:
            category = Category.objects.all().get(id=self.kwargs['category'])

            if category.isDefault:
                self.permission_classes = [IsAdminUser, ]

            return super(CategoryDetail, self).get_permissions()
        else:
            return super(CategoryDetail, self).get_permissions()


class TimeLine(generics.ListAPIView):
    permission_classes = [IsAuthenticated, ]
    queryset = Post.objects.filter(timeline=True).order_by('event_date')
    serializer_class = PostSerializer

    # 사용자가 작성한 글만 불러오게 하기
    def get_queryset(self):
        qs = super().get_queryset()
        qs = qs.filter(user=self.request.user)
        return qs


class PostWithLogin(APIView):
    permission_classes = []

    def post(self, request, *args, **kwargs):
        url = request.build_absolute_uri('/auth/') + 'login/'
        data = {'email': request.data['email'],
                'password': request.data['password']}
        login_info = requests.post(url, data=data)

        if not 'access_token' in login_info.json():
            return Response({'오류': '로그인 정보가 존재하지 않습니다.'}, status=status.HTTP_404_NOT_FOUND)

        access_token = login_info.json()['access_token']
        refresh_token = login_info.json()['refresh_token']

        if 'category' in request.data:
            # 1. 기본 카테고리에서 찾기
            # 2. 없으면 유저 카테고리에서 찾기
 
                category = Category.objects.all().filter(name=request.data['category']).filter(isDefault=True)
                if not category.exists():
                    if Category.objects.all().filter(name=request.data['category']).filter(generated_user=int(login_info.json()['user']['pk'])).exists():
                        category = Category.objects.all().filter(name=request.data['category']).filter(generated_user=int(login_info.json()['user']['pk'])).first()
                    else:
                        return Response({'오류': '카테고리 정보가 존재하지 않습니다.'}, status=status.HTTP_404_NOT_FOUND)
                else:
                    category = Category.objects.all().filter(name=request.data['category']).filter(isDefault=True).first()

        url = request.build_absolute_uri('/post/')

        header = {}
        data = json.loads(json.dumps(request.data))

        header['Authorization'] = "JWT " + access_token
        header['refresh_token'] = refresh_token

        if 'Content-Type' in request.headers:
            header['CONTENT_TYPE'] = request.META['CONTENT_TYPE']
            header['CONTENT_LENGTH'] = request.META['CONTENT_LENGTH']

        data['user'] = int(login_info.json()['user']['pk'])
        data['category'] = category.id

        post_info = requests.post(url, headers=header, data=data, files=request.FILES)
        return HttpResponse(post_info)