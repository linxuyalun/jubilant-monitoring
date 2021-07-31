# 系统API
## 运行模式API

### 1. 获取运行模式
#### `GET /api/system/mode`
##### 返回示例：
```json
{
	"error": 0,
	"data": {
		"mode": 0
	}
}
```
说明：
- mode的值为0，1或2
	- 0，人脸车辆模式
	- 1，行为识别模式
	- 2，人流分析模式
### 2. 设置运行模式
#### `PUT /api/system/mode`
##### 请求示例：
```json
{
	"mode": 1
}
```
##### 返回示例（成功）：
```json
{
	"error": 0
}
```
##### 返回示例（失败）：
```json
{
	"error": 1,
	"message": "设置系统运行模式失败失败"

}
```
### 3. 查看清理过期数据记录

#### `GET /api/sysyem/cleanHistory`

##### 返回示例：

```json
{
	"error": 0,
	"data": [{
		"date": "2021-01-27 14:17:35",
    "policy": "0 0 1 * * *",
    "sucess": true,
    "message": '',
    "deletedCount": {
      "fallen": 0,
      "prowler": 0,
      "tracking": 0,
      "peopleflow": 0,
    },
  }]
}
```

说明：

- 最多只返回最近 10 天的清理记录情况；
- 清理成功时 message 内容为空；
- “deletedCount” 里表示各个类型此次被清理的数量

# 行为识别算法模块API

## 配置相关API
### 1. 获取报警间隔时间
#### `GET /api/pose/interval`
说明：以秒为单位，整数
##### 返回示例：
```json
{
	"error": 0,
	"data": {
		"interval": 5
	}
}
```
### 2. 设置报警间隔时间
#### `PUT /api/pose/interval`
##### 请求示例：
```json
{
	"interval": 5
}
```
##### 返回示例（成功）：
```json
{
	"error": 0
}
```
##### 返回示例（失败）：
```json
{
	"error": 1,
	"message": "设置报警间隔时间失败"

}
```
### 3. 获取摄像头算法配置
说明：哪些摄像头应用行为识别算法
#### `GET /api/pose/channels`
##### 返回示例：
```json
{
  "error": 0,
  "data": [
    {
      "id": 1,
      "location": "大门",
      "url": "rtsp://admin:rh123456@192.168.100.183:554/h264/ch1/main/av\_stream"
    },
    {
      "id": 2,
      "location": "侧门",
      "url": "rtsp://admin:rh123456@192.168.100.184:554/h264/ch1/main/av\_stream"
    }
  ]
}
```
说明：
- 初始化数据为一个空的数组
- 数组中的摄像头将应用行为识别算法
- 目前只支持rtsp协议
- id应该是与日海传感器管理的摄像头ID对应
### 4. 保存应用算法的摄像头
#### `PUT /api/pose/channels`
##### 请求示例：
```json
[
	{
		"id": 1,
		"location": "大门",
		"type": 1,
		"url": "rtsp://admin:rh123456@192.168.100.183:554/h264/ch1/main/av\_stream"
	},
	{
		"id": 2,
		"location": "侧门",
		"type": 3,
		"url": "rtsp://admin:rh123456@192.168.100.184:554/h264/ch1/main/av\_stream"
	}
]
```
说明：
- type=1, 只有姿态（fallen）；type=2，只有徘徊（prowler）；type=3，两者皆有
- PUT的数据将直接覆盖原有数据
- 请先拼接好RTSP的url
##### 返回示例（成功）：
```json
{
	"error": 0
}
```
##### 返回示例（失败）：
```json
{
	"error": 1,
	"message": "保存数据失败"
}
```
### 5. 获取徘徊最小时间
#### `GET /api/pose/prowler/minTime`
说明：以秒为单位，整数
##### 返回示例：
```json
{
	"error": 0,
	"data": {
		"interval": 5
	}
}
```
### 6. 设置徘徊最小时间
#### `PUT /api/pose/prowler/minTime`
##### 请求示例：
```json
{
	"minTime": 5
}
```
##### 返回示例（成功）：
```json
{
	"error": 0
}
```
##### 返回示例（失败）：
```json
{
	"error": 1,
	"message": "设置徘徊最小时间失败"

}
```
## 报警数据API
### 1. 获取姿态报警消息统计信息
##### `GET /api/pose/fallen/statistics`
##### 返回示例：
```json
{
  "error": 0,
  "data": [
    {
      "id": 0,
      "location": "全部",
      "quantity": 3
    },
    {
      "id": 1,
      "location": "大门",
      "quantity": 2
    },
    {
      "id": 2,
      "location": "侧门",
      "quantity": 1
    }
  ]
}
```
说明：
- 报警消息的数量
- id=0，是所有摄像头的合计值
### 2. 获取徘徊报警消息统计信息
##### `GET /api/pose/prowler/statistics`
##### 返回示例：
```json
[
	{
		"id": 0,
		"location": "全部",
		"quantity": 3
	},
	{
		"id": 1,
		"location": "大门",
		"quantity": 2
	},
	{
		"id": 2,
		"location": "侧门",
		"quantity": 1
	}
]
```
说明：
- 报警消息的数量
- id=0，是所有摄像头的合计值
### 3. 获取追踪报警消息统计信息

##### `GET /api/pose/tracking/statistics`

##### 返回示例：

```json
[
	{
		"id": 0,
		"location": "全部",
		"quantity": 3
	},
	{
		"id": 1,
		"location": "大门",
		"quantity": 2
	},
	{
		"id": 2,
		"location": "侧门",
		"quantity": 1
	}
]
```

说明：

- 报警消息的数量
- id=0，是所有摄像头的合计值

### 4. 获取姿态报警消息
#### `GET /api/pose/fallen/messages?pageIndex=1&pageSize=12&channelId=1&startTime=2021-01-01&endTime=2021-01-31`
 #### 参数说明
| 参数 | 说明 |
| --- | --- |
| pageIndex | 分页Index，从0计数 |
| pageSize | 每页大小 |
| channelId | 摄像头ID，等于0时，取所有摄像头的报警信息 |
| startTime | 查询的起始时间，年-月-日 |
| endTime | 查询的截止时间，年-月-日 |
##### 返回示例：
```json
{
	"error": 0,
  "data": {
    "total": 24,
    "size": 2,
    "data": [
      {
        "time": "2021-01-27 14:17:35",
        "channelId": 1,
        "location": "大门",
        "images": {
          "person": "base64",
          "scene": "base64",
        },
        "bbox": {
          "x0": 100,
          "y0": 100,
          "x1": 100,
          "y1": 100
        }
      },
      {
        "time": "2021-01-27 15:17:35",
        "channelId": 2,
        "location": "侧门",
        "images": {
          "person": "",
          "scene": "",
        },
        "bbox": {
          "x0": 100,
          "y0": 100,
          "x1": 100,
          "y1": 100
        }
      }
    ]
  }
}
```
### 5. 获取徘徊报警消息
#### `GET /api/pose/prowler/messages?pageIndex=1&pageSize=12&channelId=1&startTime=2021-01-01&endTime=2021-01-31`
 #### 参数说明
| 参数 | 说明 |
| --- | --- |
| pageIndex | 分页Index，从0计数 |
| pageSize | 每页大小 |
| channelId | 摄像头ID，等于0时，取所有摄像头的报警信息 |
| startTime | 查询的起始时间，年-月-日 |
| endTime | 查询的截止时间，年-月-日 |
##### 返回示例：
```json
{
	"error": 0,
  "data": {
    "total": 24,
    "size": 2,
    "data": [
      {
        "time": "2021-01-27 14:17:35",
        "channelId": 1,
        "location": "大门",
        "peopleId": 12,
        "images": {
          "person": "base64",
          "scene": "base64",
        },
        "bbox": {
          "x0": 100,
          "y0": 100,
          "x1": 100,
          "y1": 100
        }
      },
      {
        "time": "2021-01-27 15:17:35",
        "channelId": 2,
        "location": "侧门",
        "peopleId": 12,
        "images": {
          "person": "",
          "scene": "",
        },
        "bbox": {
          "x0": 100,
          "y0": 100,
          "x1": 100,
          "y1": 100
        }
      }
    ]
  }
}
```
### 6. 获取徘徊报警消息

#### `GET /api/pose/tracking/messages?pageIndex=1&pageSize=12&channelId=1&startTime=2021-01-01&endTime=2021-01-31`

 #### 参数说明

| 参数      | 说明                                      |
| --------- | ----------------------------------------- |
| pageIndex | 分页Index，从0计数                        |
| pageSize  | 每页大小                                  |
| channelId | 摄像头ID，等于0时，取所有摄像头的报警信息 |
| startTime | 查询的起始时间，年-月-日                  |
| endTime   | 查询的截止时间，年-月-日                  |

##### 返回示例：

```json
{
	"error": 0,
  "data": {
    "total": 24,
    "size": 2,
    "data": [
      {
        "time": "2021-01-27 14:17:35",
        "channelId": 1,
        "location": "大门",
        "peopleId": 12,
        "images": {
          "person": "base64",
          "scene": "base64",
        },
        "bbox": {
          "x0": 100,
          "y0": 100,
          "x1": 100,
          "y1": 100
        }
      },
      {
        "time": "2021-01-27 15:17:35",
        "channelId": 2,
        "location": "侧门",
        "peopleId": 12,
        "images": {
          "person": "",
          "scene": "",
        },
        "bbox": {
          "x0": 100,
          "y0": 100,
          "x1": 100,
          "y1": 100
        }
      }
    ]
  }
}
```



# 人流算法API

## 配置相关API
### 1. 获取摄像头算法配置
说明：哪些摄像头应用行为识别算法
#### `GET /api/peopleflow/channels`
##### 返回示例：
```json
[{
	"id": 1,
	"location": "大门",
	"url": "rtsp://admin:rh123456@192.168.100.183:554/h264/ch1/main/av\_stream"
}]
```
说明：
- 初始化数据为一个空的数组
- 目前只支持rtsp协议
- id应该是与日海传感器管理的摄像头ID对应
### 2. 保存应用行为识别算法的摄像头
#### `PUT /api/peopleflow/channels`
##### 请求示例：
```json
[{
	"id": 1,
	"location": "大门",
	"url": "rtsp://admin:rh123456@192.168.100.183:554/h264/ch1/main/av\_stream"
}]
```
说明：
- PUT的数据将直接覆盖原有数据
- 请先拼接好RTSP的url
##### 返回示例（成功）：
```json
{
	"error": 0
}
```
##### 返回示例（失败）：
```json
{
	"error": 1,
	"message": "保存数据失败"
}
```
## 数据相关API
### 1. 获取实时人流数据
#### `GET /api/peopleflow/monitoring/:channelId`
##### 返回示例（有数据）：
```json
{
  "error": 0,
  "data": {
    "id": 1,
    "time": "2021-01-27 15:17:35"
    "location": "大门",
    "in": 12,
    "out": 14,
    "total": 8,
    "x": [12, 15, 49, 12, 23, 49, 60, 90],
    "y": [12, 15, 49, 12, 23, 49, 60, 90]
  }
}
```
#### 返回示例（无数据）：
```json
{
  "error": 0,
  "data": {}
}
```
