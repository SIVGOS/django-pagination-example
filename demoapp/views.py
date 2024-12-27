import urllib.parse
import math
from django.shortcuts import render
from django.db.models import Q
from .models import City

# Create your views here.

def index_page(request):
    return render(request, 'index.html')

def page1_render(request):
    return render(request, 'page1.html')


def page2_render(request):
    return render(request, 'page2.html', {'name': 'Sabyasachi'})


def page3_render(request):
    return render(request, 'page3.html')

def paginated_view(request):
    page = int(request.GET.get('page', 1))
    per_page = 60
    
    data = City.objects.all()

    if 'search' in request.GET:
        search = request.GET.get('search')
        data = data.filter(Q(city__icontains = search) | Q(state__icontains = search))
    
    if 'sortby' in request.GET:
        sort_by = request.GET.get('sortby').split(',')
        model_fields = [z.name for z in City._meta.get_fields()]
        sort_by = [z for z in sort_by if z.lstrip('-') in model_fields]
        data = data.order_by(*sort_by)
    
    N = len(data)
    page_count = math.ceil(N/per_page)
    start = (page-1)*per_page
    end = page*per_page
    data = data[start:end]
    for i, d in enumerate(data):
        d.index = start+i+1
    request_get = request.GET.copy()
    if 'page' in request_get:
        del request_get['page']

    context = {'cities': data,
            'current_page': page,
            'pages': list(range(1, page_count+1)),
            'page_count': page_count,
            'prev_page_number': page-1,
            'next_page_number': page+1,
            'page_url_prefix': request.path + '?' + urllib.parse.urlencode(request_get) + '&page='
            }
    return render(request, 'show_results.html', context)
