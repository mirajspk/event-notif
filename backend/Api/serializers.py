from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Clubs, Subscriber, Event

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    club_name = serializers.CharField(source='club.club_name', read_only=True)  
    is_club_admin = serializers.BooleanField(source='is_admin_user', read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'club', 'club_name', 'is_club_admin']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password') 
        user = User.objects.create(**validated_data)  
        user.set_password(password)  
        user.save()
        return user

class ClubsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Clubs
        fields = '__all__'


class EventSerializer(serializers.ModelSerializer):
    host = ClubsSerializer()
    image = serializers.ImageField(use_url=True)  

    class Meta:
        model = Event
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
