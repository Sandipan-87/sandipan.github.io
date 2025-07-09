# accounts/api_views.py
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.models import User
from .serializers import RegisterSerializer, UserSerializer

class RegisterAPIView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = RegisterSerializer

class UserDetailAPIView(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user

class WatchLaterAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        profile = request.user.profile
        return Response(profile.watch_later_videos, status=status.HTTP_200_OK)

    def post(self, request):
        profile = request.user.profile
        video_data = request.data.get('video')
        
        if not video_data or 'id' not in video_data:
            return Response({"error": "Video data with ID is required."}, status=status.HTTP_400_BAD_REQUEST)

        if not any(v['id'] == video_data['id'] for v in profile.watch_later_videos):
            profile.watch_later_videos.append(video_data)
            profile.save()
            
        return Response(profile.watch_later_videos, status=status.HTTP_200_OK)

    def delete(self, request):
        profile = request.user.profile
        video_id = request.data.get('videoId')

        if not video_id:
            return Response({"error": "Video ID is required."}, status=status.HTTP_400_BAD_REQUEST)
        
        profile.watch_later_videos = [v for v in profile.watch_later_videos if v['id'] != video_id]
        profile.save()

        return Response(profile.watch_later_videos, status=status.HTTP_200_OK)
