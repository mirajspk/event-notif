from rest_framework import serializers # type: ignore
from .models import Event , Clubs

class EventSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=True)  # ✅ Use ImageField for proper URL handling

    class Meta:
        model = Event
        fields = '__all__'


class ClubsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Clubs
        fields = '__all__'
