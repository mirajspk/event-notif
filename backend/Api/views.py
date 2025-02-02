# from django.shortcuts import get_object_or_404
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status
# from .serializers import EventSerializer, ClubsSerializer
# from .models import Event, Clubs
# from rest_framework.parsers import MultiPartParser, FormParser
#
# class EventList(APIView):
#     # To parse the formfield and image upload by the frontend
#     parser_classes = (MultiPartParser, FormParser)
#
#     def get(self, request, id=None):
#         if id:
#             # Return single event if id is provided
#             event = get_object_or_404(Event, pk=id)
#             serializer = EventSerializer(event,context={'request': request})
#             return Response(serializer.data)
#         
#         # Return all events if no id is provided
#         events = Event.objects.all()
#         serializer = EventSerializer(events,context={'request': request}, many=True)
#         return Response(serializer.data)
#
#     def post(self, request):
#         serializer = EventSerializer(data=request.data,context={'request': request})
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#
#     def put(self, request, id):
#         event = get_object_or_404(Event, pk=id)
#         serializer = EventSerializer(event,context={'request': request} ,data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#
#     def delete(self, request, id):
#         event = get_object_or_404(Event, pk=id)
#         event.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)


from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import EventSerializer, ClubsSerializer
from .models import Event, Clubs
from rest_framework.parsers import MultiPartParser, FormParser

class EventList(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, id=None):
        if id:
            # Fetch a single event
            event = get_object_or_404(Event, pk=id)
            serializer = EventSerializer(event, context={'request': request})  # ✅ Fix: Pass request context
            return Response(serializer.data)
        
        # Fetch all events
        events = Event.objects.all()
        serializer = EventSerializer(events, many=True, context={'request': request})  # ✅ Fix: Pass request context
        return Response(serializer.data)

    def post(self, request):
        serializer = EventSerializer(data=request.data, context={'request': request})  # ✅ Fix: Pass request context
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, id):
        event = get_object_or_404(Event, pk=id)
        serializer = EventSerializer(event, data=request.data, context={'request': request})  # ✅ Fix: Pass request context
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        event = get_object_or_404(Event, pk=id)
        event.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

