from django.shortcuts import render
from rest_framework import serializers, viewsets
from accounts.models import User
# from .serializers import UserLoginSerializer

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        field = ['__all__']

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
