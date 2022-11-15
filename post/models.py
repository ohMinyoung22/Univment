from django.db import models
import datetime

from accounts.models import User

# Create your models here.

class Category(models.Model):
    id = models.AutoField(primary_key = True)
    name = models.CharField(max_length = 100)
    color = models.CharField(max_length=20, null=True)
    isDefault = models.BooleanField(null = False, default=False)
    generated_user = models.ForeignKey(User, null = False, on_delete = models.CASCADE)
    question1 = models.TextField(max_length= 500)
    question2 = models.TextField(max_length= 500)
    question3 = models.TextField(max_length= 500)
    question4 = models.TextField(max_length= 500)
    class Meta:
        unique_together = ["name", "generated_user"]
    
    def __str__(self):
        return self.name

class Post(models.Model):
    id = models.AutoField(primary_key = True)
    user = models.ForeignKey(User, on_delete = models.CASCADE)
    title = models.CharField(max_length = 100, null=False, default = '')
    image = models.ImageField(null = True)
    event_date = models.DateField(default=datetime.date.today, null=False)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name = 'posts', null = True)
    timeline = models.BooleanField(default=False)
    answer1 = models.TextField(max_length=500)
    answer2 = models.TextField(max_length=500)
    answer3 = models.TextField(max_length=500)
    answer4 = models.TextField(max_length=500)