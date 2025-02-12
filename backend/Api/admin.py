from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Clubs, Subscriber, Event, EventRegistration, User

class CustomUserAdmin(UserAdmin):
    list_display = ('username', 'email', 'user_type', 'club', 'is_staff', 'is_active')
    list_filter = ('user_type', 'club', 'is_staff', 'is_active')
    search_fields = ('username', 'email', 'club__club_name')
    ordering = ('username',)
    
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('Personal info', {'fields': ('email', 'first_name', 'last_name')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Club Information', {'fields': ('user_type', 'club')}),
    )
    
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'password1', 'password2', 'user_type', 'club'),
        }),
    )

class ClubsAdmin(admin.ModelAdmin):
    list_display = ('club_name', 'get_admin_count', 'description')
    search_fields = ('club_name',)
    
    def get_admin_count(self, obj):
        return obj.admins.filter(user_type='ADMIN').count()
    get_admin_count.short_description = 'Number of Admins'

@admin.register(Subscriber)
class SubscriberAdmin(admin.ModelAdmin):
    list_display = ('email', 'subscribed_at')
    search_fields = ('email',)
    filter_horizontal = ('clubs',)

class EventAdmin(admin.ModelAdmin):
    list_display = ('name', 'host', 'type', 'date', 'location')
    list_filter = ('type', 'host', 'date')
    search_fields = ('name', 'description', 'location')
    date_hierarchy = 'date'
    
    fieldsets = (
        ('Event Information', {
            'fields': ('name', 'type', 'description', 'host', 'created_by')
        }),
        ('Date and Location', {
            'fields': ('date', 'startTime', 'location')
        }),
        ('Media and Links', {
            'fields': ('image', 'registration_link')
        }),
    )

# Since we don't see the fields in your EventRegistration model,
# let's create a basic admin interface for it
class EventRegistrationAdmin(admin.ModelAdmin):
    list_display = ('event',)
    list_filter = ('event',)
    search_fields = ('event__name',)

# Register the models with their custom admin classes
admin.site.register(User, CustomUserAdmin)
admin.site.register(Clubs, ClubsAdmin)
admin.site.register(Event, EventAdmin)
admin.site.register(EventRegistration, EventRegistrationAdmin)
