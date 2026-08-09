from django.db import models

# Create your models here.
class User(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    login_code = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True,null=True)

    def __str__(self):
        return self.email