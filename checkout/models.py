from django.db import models

# Create your models here.
from users.models import User

class Checkout(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='checkouts',
        null=True
    )
    phone = models.CharField(max_length=15)
    shipping_address = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.email
