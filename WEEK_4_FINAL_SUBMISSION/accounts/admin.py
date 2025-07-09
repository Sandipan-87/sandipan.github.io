from django.contrib import admin
from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import Profile

class ProfileInline(admin.StackedInline):
    model = Profile
    can_delete = False

class UserAdmin(BaseUserAdmin):
    inlines = (ProfileInline,)
    list_display = ('username', 'email', 'first_name', 'last_name', 'is_active', 'get_email_verified')
    search_fields = ('username', 'email', 'first_name', 'last_name')
    ordering = ('username',)
    
    def get_email_verified(self, obj):
        return obj.profile.email_verified if hasattr(obj, 'profile') else False
    get_email_verified.short_description = 'Email Verified'
    get_email_verified.boolean = True

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'email_verified', 'created_at')
    search_fields = ('user__username', 'user__email')
    list_filter = ('email_verified', 'created_at')
    ordering = ('-created_at',)

# Re-register UserAdmin
admin.site.unregister(User)
admin.site.register(User, UserAdmin)
