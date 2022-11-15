# from .models import User
# from rest_framework import serializers

# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         field = ['name', 'email']

from rest_framework import serializers
from dj_rest_auth.registration.serializers import RegisterSerializer
from dj_rest_auth.serializers import UserDetailsSerializer
from accounts.models import User

class CustomRegisterSerializer(RegisterSerializer):
    name = serializers.CharField(max_length = 10)
    image = serializers.ImageField(default='default.png')

    def get_cleaned_data(self):
        data = super().get_cleaned_data()
        data['name'] = self.validated_data.get('name','')

        return data

class CustomDetailsSerializer(UserDetailsSerializer):
    class Meta(UserDetailsSerializer.Meta):
        fields = UserDetailsSerializer.Meta.fields + \
            ('image',)