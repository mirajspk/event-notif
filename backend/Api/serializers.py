from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Clubs, Subscriber, Event, EventRegistration

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'club_name', 'is_club_admin']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class EventSerializer(serializers.ModelSerializer):
    host_details = serializers.SerializerMethodField()

    class Meta:
        model = Event
        # fields = ['name', 'location', 'host', 'type', 'date',
        #           'description', 'registration_link', 'created_by', 'host_details']
        fields = '__all__'

    def get_host_details(self, obj):
        return {
            'name': obj.host.club_name,
            'logo_url': obj.host.logo_url
        }

class ClubsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Clubs
        fields = '__all__'


class EventRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventRegistration
        fields = '__all__'


class SubscriberSerializer(serializers.ModelSerializer):
    clubs = serializers.PrimaryKeyRelatedField(
        queryset=Clubs.objects.all(),
        many = True,
        required = True
    )
    class Meta:
        model = Subscriber
        fields = ['email', 'clubs']
