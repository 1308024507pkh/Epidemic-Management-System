# Create your views here.
from django.http import HttpResponse
from . import models
from django.core import serializers
from django.core.serializers.json import DjangoJSONEncoder
import json
import datetime


def sendNews(request):
    result = {'success': 'OK'}
    data = [
        {
            "province": "浙江",
            "type": "复工复产",
            "time": "2020-6-1",
            "content": "贼鸡儿烦啊111",
            "id": "sdfsdfsef1"
        },
        {
            "province": "北京",
            "type": "社区管控",
            "time": "2020-6-2",
            "content": "贼鸡儿烦啊222",
            "id": "sdfsdfsef2"
        },
        {
            "province": "山东",
            "type": "交通出行",
            "time": "2020-6-3",
            "content": "贼鸡儿烦啊333",
            "id": "sdfsdfsef3"
        },
        {
            "province": "辽宁",
            "type": "医疗服务",
            "time": "2020-6-4",
            "content": "贼鸡儿烦啊444",
            "id": "sdfsdfsef4"
        }
    ]
    print(json.dumps(data))
    result = []
    temp = models.News.objects.all()
    for t in temp:
        news = {"province": t.Province, "type": t.Type, "time": t.Time, "content": t.Content, "id": t.News_id }
        result.append(news)
    print(result)
    return HttpResponse(json.dumps(result), content_type='application/json')


def actionRelease(request):
    result = {'success': "true"}
    if request.method == "POST":
        data = json.loads(request.body)
        id = data['News_id']
        time = data['Time']
        pro = data['Province']
        type = data['Type']
        content = data['Content']
        check = models.News.objects.filter(News_id=id)
        check_list = []
        for i in check:
            check_list.append(i.Content)
        # 如果有重复就不能写入
        if len(check_list) != 0:
            result['success'] = 'false'
            return HttpResponse(json.dumps(result), content_type='application/json')

        if id != "" and type != "" and pro != "" and time != "":
            # insert 语句, 用json格式返回操作是否执行的结果
            models.News.objects.create(News_id=id, Time=time, Type=type,
                                       Province=pro, Content=content)
            return HttpResponse(json.dumps(result), content_type='application/json')
    result['success'] = 'false'
    return HttpResponse(json.dumps(result), content_type='application/json')


def sendPopulationFlow(request):
    # print(request)
    # data这一堆是之前的测试数据 先留着了，后面不会用到
    today = datetime.date.today()
    print(today)
    data = [
        {
            "province": "北京",
            "in": 2000,
            "out": 500
        },
        {
            "province": "上海",
            "in": 90,
            "out": 60
        },
        {
            "province": "天津",
            "in": 80,
            "out": 50
        },
        {
            "province": "重庆",
            "in": 70,
            "out": 40
        },
        {
            "province": "浙江",
            "in": 60,
            "out": 30
        },
        {
            "province": "江苏",
            "in": 65,
            "out": 35
        },
        {
            "province": "新疆",
            "in": 65,
            "out": 35
        },
        {
            "province": "西藏",
            "in": 65,
            "out": 35
        },
        {
            "province": "青海",
            "in": 65,
            "out": 35
        },
        {
            "province": "四川",
            "in": 65,
            "out": 35
        },
        {
            "province": "山西",
            "in": 65,
            "out": 35
        },
        {
            "province": "陕西",
            "in": 65,
            "out": 35
        },
        {
            "province": "贵州",
            "in": 65,
            "out": 35
        },
        {
            "province": "云南",
            "in": 65,
            "out": 35
        },
        {
            "province": "宁夏",
            "in": 65,
            "out": 35
        },
        {
            "province": "广东",
            "in": 65,
            "out": 35
        },
        {
            "province": "广西",
            "in": 65,
            "out": 35
        },
        {
            "province": "海南",
            "in": 65,
            "out": 35
        },
        {
            "province": "福建",
            "in": 65,
            "out": 35
        },
        {
            "province": "安徽",
            "in": 65,
            "out": 35
        },
        {
            "province": "黑龙江",
            "in": 65,
            "out": 35
        },
        {
            "province": "吉林",
            "in": 65,
            "out": 35
        },
        {
            "province": "辽宁",
            "in": 65,
            "out": 35
        },
        {
            "province": "河南",
            "in": 65,
            "out": 35
        },
        {
            "province": "河北",
            "in": 65,
            "out": 35
        },
        {
            "province": "江西",
            "in": 65,
            "out": 35
        },
        {
            "province": "湖南",
            "in": 65,
            "out": 35
        },
        {
            "province": "湖北",
            "in": 10000,
            "out": 2000
        },
        {
            "province": "香港",
            "in": 65,
            "out": 35
        },
        {
            "province": "台湾",
            "in": 65,
            "out": 35
        },
        {
            "province": "内蒙古",
            "in": 65,
            "out": 35
        },
        {
            "province": "山东",
            "in": 65,
            "out": 35
        },
        {
            "province": "甘肃",
            "in": 65,
            "out": 35
        },
        {
            "province": "澳门",
            "in": 65,
            "out": 35
        },
        {
            "province": "南海诸岛",
            "in": 65,
            "out": 35
        }
    ]
    result = []
    if request.method == "GET":
        flow_today = models.flow.objects.filter(Date=today)
        flow_data = {}
        # 基本思路，遍历查询集，如果起点或终点不在结果的字典中就添加一条初始化的数据
        # 否则就在原有的基础上加上流入/流出的值
        for record in flow_today:
            print(record.Province_source)
            print(record.Province_destination)
            print(record.Amount)
            if record.Province_source not in flow_data.keys():
                flow_data[record.Province_source] = {'in': 0, 'out': record.Amount}
            else:
                flow_data[record.Province_source]['out'] += record.Amount
            if record.Province_destination not in flow_data.keys():
                flow_data[record.Province_destination] = {'in': record.Amount, 'out': 0}
            else:
                flow_data[record.Province_destination]['in'] += record.Amount
        for i in flow_data.keys():
            tmp = {'province': i, 'in': flow_data[i]['in'],
                   'out': flow_data[i]['out']}
            result.append(tmp)
        print(result)

    return HttpResponse(json.dumps(result), content_type='application/json')


# 更新流动人口的信息
def updatePopulationFlow(request):
    res = {'success': "true"}
    print(request.method)
    if request.method == "POST":
        data = json.loads(request.body)
        models.flow.objects.create(Province_source=data['Province_source'],
                                   Province_destination=data['Province_destination'],
                                   Amount=int(data['Amount']), Date=data['Date'])
        print(data)
        return HttpResponse(json.dumps(res), content_type='application/json')
    res['success'] = "false"
    return HttpResponse(json.dumps(res), content_type='application/json')


"""
def newsRelease(request):
    result = {'success': True}
    if request.method == "POST":
        # 从post请求中获取对应的值
        # 前端应该检查这些东西有没有问题，特别是日期，特别容易出错，目前的数据表都是按照设计报告里的数据表来定义的
        news_id = request.POST.get('News_id', '')
        time = request.POST.get('Time', '')
        province = request.POST.get('Province', '')
        news_type = request.POST.get('type', '')
        news_content = request.POST.get('content', '')
        # 这一行方便在命令行中进行调试
        print(news_id, time, province, news_type, news_content)
        # 查询id是否有重复
        check = models.News.objects.filter(News_id=news_id)
        check_list = []
        for i in check:
            check_list.append(i.news_content)
        # 如果有重复就不能写入
        if len(check_list) != 0:
            result['success'] = False
            return HttpResponse(json.dumps(result), content_type='application/json')

        if news_id != "" and news_type != "" and province != "" and time != "":
            # insert 语句, 用json格式返回操作是否执行的结果
            models.News.objects.create(News_id=news_id, Time=time, type=news_type,
                                       Province=province, Content=news_content)
            return HttpResponse(json.dumps(result), content_type='application/json')
    result['success'] = False
    return HttpResponse(json.dumps(result), content_type='application/json')


def getNews(request):
    result = {'status': 'success'}
    if request.method == "GET":
        news = serializers.serialize('python', models.News.objects.all())  # 获取数据表中的所有数据并序列化
        # 这一部分的筛选可以在前端进行，当然如果写前端的人没有写，到时候我可以负责把这一部分再具体分一下
        # 现在不写的主要原因是我不知道他们4中措施对应的
        result['data'] = news
        return HttpResponse(json.dumps(result, cls=DjangoJSONEncoder), content_type='application/json')
    result['status'] = 'fail'
    return HttpResponse(json.dumps(result), content_type='application/json')


def populationFlow(request):
    result = {'success': False}
    if request.method == "POST":
        start = request.POST.get('Province_source', '')
        end = request.POST.get('Province_destination', '')
        n = request.POST.get('Amount', '')
        date = request.POST.get('Date', '')
        # 检查是否有重复
        check = models.Population_flow.objects.filter(Province_source=start, Province_destination=end)
        checklist = []
        for i in check:
            checklist.append(i.n)
        if len(checklist) != 0:
            return HttpResponse(json.dumps(result), content_type='application/json')
        # 没有重复的正常情况，写入数据，返回true
        else:
            models.Population_flow.objects.create(Province_source=start, Province_destination=end,
                                                  Amount=n, Date=date)
            result['success'] = True
            return HttpResponse(json.dumps(result), content_type='application/json')
    return HttpResponse(json.dumps(result), content_type='application/json')


def getPopulationFlow(request, date):
    result = []
    if request.method == "GET":
        flow_today = models.Population_flow.objects.filter(Date=date)
        flow_data = {}
        # 基本思路，遍历查询集，如果起点或终点不在结果的字典中就添加一条初始化的数据
        # 否则就在原有的基础上加上流入/流出的值
        for record in flow_today:
            if record.Province_source not in flow_data.keys():
                flow_data[record.Province_source] = {'in': 0, 'out': 0}
            else:
                flow_data[record.Province_source]['out'] += record.Amount
            if record.Province_destination not in flow_data.keys():
                flow_data[record.Province_destination] = {'in': 0, 'out': 0}
            else:
                flow_data[record.Province_destination]['in'] += record.Amount
        for data in flow_data.keys():
            tmp = {'province': data, 'in': flow_data[data]['in'],
                   'out': flow_data[data]['out']}
            result.append(tmp)
        return HttpResponse(json.dumps(result, cls=DjangoJSONEncoder), content_type='application/json')
"""
