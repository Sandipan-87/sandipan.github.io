from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.contrib.auth.models import User
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.contrib.auth.tokens import default_token_generator
from django.utils import timezone
from .forms import CustomUserCreationForm
from .models import Profile

def register_view(request):
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST, request.FILES)
        if form.is_valid():
            user = form.save()
            
            # Generate verification token
            token = default_token_generator.make_token(user)
            uid = urlsafe_base64_encode(force_bytes(user.pk))
            
            # Enhanced success message
            messages.success(request, f'User created successfully ✅ Please verify your email.')
            return redirect('verify', uid=uid, token=token)
    else:
        form = CustomUserCreationForm()
    
    return render(request, 'register.html', {'form': form})

def login_view(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            messages.success(request, f'Welcome back, {user.username}! ✅')
            return redirect('dashboard')
        else:
            messages.error(request, 'Invalid username or password. ❌')
    
    return render(request, 'login.html')

def logout_view(request):
    logout(request)
    messages.success(request, 'You have been logged out successfully. ✅')
    return redirect('login')

@login_required
def dashboard_view(request):
    # Get watch later items from session
    watch_later = request.session.get('watch_later', [])
    return render(request, 'dashboard.html', {'watch_later': watch_later})

def verify_view(request, uid, token):
    try:
        uid = force_str(urlsafe_base64_decode(uid))
        user = User.objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None
    
    if user is not None and default_token_generator.check_token(user, token):
        profile = Profile.objects.get(user=user)
        profile.email_verified = True
        profile.save()
        messages.success(request, 'Account Verified Successfully! ✅')
        return redirect('login')
    else:
        messages.error(request, 'Verification link is invalid! ❌')
        return render(request, 'verify.html', {'valid': False})

# Watch Later simulation views
@login_required
def watch_later_view(request):
    watch_later = request.session.get('watch_later', [])
    return render(request, 'watch_later.html', {'watch_later': watch_later})

@login_required
def add_to_watch_later(request):
    if request.method == 'POST':
        video_title = request.POST.get('video_title')
        video_url = request.POST.get('video_url', '#')
        
        if 'watch_later' not in request.session:
            request.session['watch_later'] = []
        
        # Add video to watch later
        video_item = {
            'title': video_title,
            'url': video_url,
            'added_date': str(timezone.now().strftime('%Y-%m-%d %H:%M'))
        }
        
        request.session['watch_later'].append(video_item)
        request.session.modified = True
        
        messages.success(request, f'"{video_title}" added to Watch Later! ✅')
        return redirect('dashboard')
    
    return render(request, 'add_video.html')

@login_required
def remove_from_watch_later(request, index):
    watch_later = request.session.get('watch_later', [])
    if 0 <= index < len(watch_later):
        removed_item = watch_later.pop(index)
        request.session['watch_later'] = watch_later
        request.session.modified = True
        messages.success(request, f'"{removed_item["title"]}" removed from Watch Later! ✅')
    
    return redirect('watch_later')
