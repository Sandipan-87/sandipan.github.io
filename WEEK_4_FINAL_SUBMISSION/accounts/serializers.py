# accounts/serializers.py
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['profile_image', 'email_verified']

class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(read_only=True)
    
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'profile']

class RegisterSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)
    profile_image = serializers.ImageField(required=False, write_only=True)
    
    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'password2', 'profile_image']
        extra_kwargs = {
            'password': {'write_only': True}
        }
        
    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        return attrs

    def create(self, validated_data):
        profile_image = validated_data.pop('profile_image', None)
        validated_data.pop('password2') # Remove the confirmation password
        user = User.objects.create_user(**validated_data)
        Profile.objects.create(user=user, profile_image=profile_image)
        return user
