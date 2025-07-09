# accounts/models.py
from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    email_verified = models.BooleanField(default=False)
    profile_image = models.ImageField(upload_to='profile_images/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    watch_later_videos = models.JSONField(default=list, blank=True)

    def __str__(self):
        return f'{self.user.username} Profile'
