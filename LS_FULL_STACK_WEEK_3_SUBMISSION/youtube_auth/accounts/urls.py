from django.urls import path
from . import views

urlpatterns = [
    path('', views.login_view, name='login'),
    path('register/', views.register_view, name='register'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('dashboard/', views.dashboard_view, name='dashboard'),
    path('verify/<str:uid>/<str:token>/', views.verify_view, name='verify'),
    path('watch-later/', views.watch_later_view, name='watch_later'),
    path('add-video/', views.add_to_watch_later, name='add_video'),
    path('remove-video/<int:index>/', views.remove_from_watch_later, name='remove_video'),
]
