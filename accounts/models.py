from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.base_user import BaseUserManager, AbstractBaseUser

# Create your models here.
class UserManager(BaseUserManager):

    def create_user(self, name, email, password, image, **extra_fields):
        if not name:
            raise ValueError('Users must have an name')

        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(
            name = name,
            email=email,
            image=image,
            **extra_fields
        )
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, name=None, email=None, password=None, image=None, **extra_fields):
        superuser = self.create_user(
            name = name,
            email=email,
            image=image,
            password=password,
            **extra_fields
        )
        superuser.is_staff = True
        superuser.is_superuser = True
        superuser.is_active = True
        superuser.save()
        return superuser


class User(AbstractBaseUser):

    name = models.CharField(max_length=10)
    email = models.EmailField(max_length=30, unique=True)
    image = models.ImageField(default='default.png')

    is_superuser = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager() # 헬퍼 클래스

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    def __str__(self):
        return self.name

class CustomUser(AbstractUser):
    fullname = models.CharField(max_length = 10)