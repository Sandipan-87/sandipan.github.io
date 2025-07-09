# accounts/urls.py
from django.urls import path
from .api_views import RegisterAPIView, UserDetailAPIView, WatchLaterAPIView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('api/register/', RegisterAPIView.as_view(), name='api_register'),
    path('api/login/', TokenObtainPairView.as_view(), name='api_login'), # This handles login
    path('api/token/refresh/', TokenRefreshView.as_view(), name='api_token_refresh'),
    path('api/user/', UserDetailAPIView.as_view(), name='api_user_detail'),
    path('api/watch-later/', WatchLaterAPIView.as_view(), name='api_watch_later'),
]
