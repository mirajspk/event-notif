import logging
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import EventSerializer
from .models import Event
from rest_framework.parsers import MultiPartParser, FormParser

logger = logging.getLogger(__name__)

class EventList(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, id=None):
        if id:
            event = get_object_or_404(Event, pk=id)
            serializer = EventSerializer(event, context={'request': request})
            return Response(serializer.data)
        
        events = Event.objects.all()
        serializer = EventSerializer(events, many=True, context={'request': request})
        return Response(serializer.data)

    def post(self, request):
        serializer = EventSerializer(data=request.data, context={'request': request})
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        logger.error(f"Validation failed: {serializer.errors}")
        
        return Response({
            'error': 'Bad Request',
            'details': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, id):
        event = get_object_or_404(Event, pk=id)
        serializer = EventSerializer(event, data=request.data, context={'request': request})
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        event = get_object_or_404(Event, pk=id)
        event.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

