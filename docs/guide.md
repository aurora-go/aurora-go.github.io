#  指南

## SDK版本
```shell
go 1.18+
```

## 快速开始
创建一个服务，注册一个 `/` 根路径接口，端口号默认为`8080`
```go
package main

import "github.com/aurora-go/aurora"

func main() {
    //创建 实例
    a := aurora.NewAurora()
    //注册接口
    a.Get("/", func() {
        a.Info("hello web")
    })
    //启动服务器
    aurora.Run(a)
}
```
[访问 localhost:8080](http://localhost:8080)

## Get 请求

### 自动解析请求参数
```go
// Get请求参数的获取，和参数名无关
//只与处理器的如参顺序和类型有关 
// GET http://localhost:8080/get?age=20&name=saber
a.Get("/get", func(age int, name string) {
    fmt.Printf("age: %d, name: %s", age, name)
})
```
[http://localhost:8080/get?age=20&name=saber](http://localhost:8080/get?age=20&name=saber)

### map解析
通过map可以 k/v 形式的参数，使用map解析请求需要注意的一点，如上述的参数类型存在多种则只能通过 `map[string]interface{}` 或者 `map[string]string` 这样的形式来处理否则参数解析将失败。
```go
// GET http://localhost:8080/get?age=20&name=saber
a.Get("/get", func(data map[string]string) {
    fmt.Println(data)
}) 
```

### 通过结构体解析
  Get也可以通过自定义结构体来接收参数，结构体的字段必须为可导出，即大写字母开头（结构体方式解析参数需要对应属性完整，否则可能存在初始化失败属性零值的bug）
```go
type Get struct {
    Name string
    Age  int
}
// GET http://localhost:8080/get?age=20&name=saber
a.Get("/get", func(data Get) {
    fmt.Println(data)
})
```


## Post 请求
请求体
```json
{
    "name": "test",
    "age": 16,
    "gender": "男",
    "address":["aa","bb"],
    "report":{
    	"a":11,
    	"b":12
    }
}
```
结构体定义
```go
//对应结构体
type Post struct {
    Name    string
    Age     int
    Gender  string
    Address []string
    Report  map[string]interface{}
}
```
### 结构体，指针以及`map`
```go
a.Post("/post1", func(post Post) {
    fmt.Println(post)
})
    
a.Post("/post2", func(post *Post) {
    fmt.Println(post)
})
    
a.Post("/post3", func(post map[string]interface{}) {
    fmt.Println(post)
})
```
!> <b style="color=red;">注意</b> : 在处理器的函数参为结构体或结构体指针解析请求，必须使用可导出的字段，否则无法解析参数。

## 结构体处理器
&emsp;&emsp;结构体处理器，是对需要使用结构体中的函数注册为处理器的一个便捷提供方式，普通注册方式虽然也可以做到使用结构体绑定的函数作为处理器，其写法相对繁琐。提供结构体处理器解析注册的同时也存在一些不便利的
情况，比如无法在接口末端使用RESTFul风格的路由。<br>


需要遵循一下几点

> - 注册的结构体需要指针类型
> - 使用HTTP方法类型作为前缀
> - 路由解析采用驼峰方式切割分段
> - 必要情况可以采用下划线 `_` 强制分割
> - 接口的路径将全部默认为小写

### 例
使用专属注册器注册
```go
type TestServer struct {

}

func (s *TestServer) GetName() {
	
}

func (s *TestServer) GetUpdate() {
	
}

func main(){
    a := aurora.NewAurora()
	a.Url("/", &TestServer{})
	aurora.Run(a)
}
```
上述例子 使用 `a.Url("/", &TestServer{})` 方法注册结构体，会按照规则解析绑定的函数，`GetName()` 将解析为接口 `/name` ，`GetUpdate()` 将解析为接口 `/update` ，
其类型都是Get请求，需要转换为其他类型的请求修改开头的驼峰前缀即可比如， `PostUpdate()` 。

## 使用中间件
中间件是一个固定的函数签名，日后也许会有所调整
```go
type Middleware func(Ctx) bool
```
### 全局中间件
直接调用 `Use` 方法即可
```go
a.Use()
```
### 局部中间件

### 结构体中间件


## 自定义日志替换

## 配置文件

### 默认配置文件

### 自定义配置文件
### 读取配置文件

## 依赖管理
### 组件
### 加载组件
### 使用组件