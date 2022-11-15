from rest_framework import serializers
from .models import Category, Post


class PostSerializer(serializers.ModelSerializer):
    timeline = False

    class Meta:
        model = Post
        fields = ('id', 'user', 'title', 'image', 'event_date', 'category','timeline', 'answer1', 'answer2', 'answer3', 'answer4')

    def create(self, validated_data):
        post = Post.objects.create(**validated_data)
        return post

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name','isDefault', 'generated_user', 'color', 'question1', 'question2', 'question3', 'question4')

    def create(self, validated_data):
        category = Category.objects.create(**validated_data)
        return category
