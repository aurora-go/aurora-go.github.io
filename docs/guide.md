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
package main

import (
	"fmt"
	"github.com/aurora-go/aurora"
)

func Before() aurora.Middleware {
	return func(ctx aurora.Ctx) bool {
		fmt.Println("before")
		return true
	}
}

func main() {
	a := aurora.NewAurora()
	a.Use(Before())
	a.Get("/", func()  {
		
	})
	aurora.Run(a)
}
```
### 局部中间件
在注册函数的最后一个参数是一个可变参数，能给一个接口配置多个中间件
```go
a.Get("/", func() {}, Before())
```
### 结构体中间件
结构体中间件，是作用在当前结构体的所有函数上面，不支持指定到具体某个函数上，如果需要特殊处理，还是选择函数模式。
```go
a.Url("/", &TestServer{}, Before())
```

## 自定义日志替换
`aurora.Log`日志接口
```go
type Log interface {
	Info(...interface{})
	Error(...interface{})
	Debug(...interface{})
	Panic(...interface{})
	Warn(...interface{})
}
```
使用自定义的 `logrus` 
```go
func main() {
	a := aurora.NewAurora()
	a.Use(logrus.New())
	aurora.Run(a)
}
```
## 配置文件
`aurora` 的配置处理采用的 `viper` 实现，仅支持 yml 格式的读取， 自带的 `ConfigCenter` 配置中心实现对 `viper` 的分装，提供了并发读写安全的操作。
### 默认配置文件
`aurora` 会加载项目跟目录下的`application.yml`配置文件，存在多个同名的配置文件加载顺序会优先查找最外层的配置。
### 读取配置文件
通过 `func (*Aurora) GetConfig() Config` 提供对配置的访问
### 自定义配置文件
实现 `aurora.Config` 接口，该接口是对 `viper` 中的一个抽取，以便用户自定义对 `viper` 中的功能进行扩展。
```go
type Config interface {
	SetConfigFile(string)
	SetConfigType(string)
	ReadConfig(io.Reader) error
	Set(string, interface{})
	SetDefault(string, interface{})
	GetStringMapString(string) map[string]string
	Get(string) interface{}
	GetStringSlice(string) []string
	GetStringMap(string) map[string]interface{}
	GetString(string) string
	GetStringMapStringSlice(string) map[string][]string
}
```
使用自定义 `viper` 替换默认的配置
```go
func main() {
	a := aurora.NewAurora()
	cnf := viper.New()
	cnf.SetConfigFile("X:\\xx\\xx\\xx\\xx\\xx.yml")
	err := cnf.ReadInConfig()
	if err != nil {
		a.Panic(err)
	}
	a.Use(cnf)
	aurora.Run(a)
}
```

## 依赖管理
依赖管理功能是 为了解决 `aurora` 运行中组件与组件之间存在的依赖关系。
### 组件
什么是组件? 在 `aurora` 中组件就是一个结构体变量，组件有唯一的id对应一个变量。组件主要分为2类，匿名组件，命名组件，前者并非没有名称，只是来源于注册方式不同采用的是结构体的全名来作为id。
### 加载组件
加载组件，就是把初始化好的变量，注册到 `aurora` 的内部容器中，在服务器启动期间，会初始化容器完成指定的依赖赋值
#### 方式一 : 命名注册
```go
type Component map[string]interface{}

//通过 Use 方法注册 Component 
func main() {
	a := aurora.NewAurora()
	//注册了一个 id 为 xxx 的组件
	a.Use(aurora.Component{"aaa":&{}})
	aurora.Run(a)
}

```
#### 方式二 : 匿名注册
```go
//通过 Use 方法直接 指针类型的结构体
func main() {
	a := aurora.NewAurora()
	//注册了一个 id 为 Xxx 的组件
	a.Use(new(Xxx))
	aurora.Run(a)
}
```

### 使用组件
把组件注册到 `aurora` 的容器中，通过 golang `tag` 属性 `ref:""` 来对容器中的依赖进行使用
```go
package main

import (
	"fmt"
	"github.com/aurora-go/aurora"
)

type Aaa struct {
	Name  string
	DataB *Bbb `ref:"b"`
}

type Bbb struct {
	Name  string
	DataA *Aaa `ref:"a"`
}

type Ccc struct {
	Name string
}

func main() {
	a := aurora.NewAurora()
	// 通过命名方式注册了 3个组件
	a.Use(aurora.Component{
		"a": &Aaa{Name: "Aaa"},
		"b": &Bbb{Name: "Bbb"},
		"c": &Ccc{Name: "Caa"},
	})
	a.Url("/", &TestServerA{})
	a.Url("/", &TestServerB{})
	aurora.Run(a)
}

type TestServerA struct {
	TestA *Aaa `ref:"a"`
}

type TestServerB struct {
	TestA *Aaa `ref:"a"`
}

// GetName 获取 组件id为a的Name属性
func (s *TestServerB) GetName() string {
	return s.TestA.Name
}

// GetUpdate 修改组件id为 a的Name属性
func (s *TestServerA) GetUpdate() {
	s.TestA.Name = "Bbb"
}
```
示例中注册了3个命名组件分别是 a,b,c 。 a组件中的 `DataB` 属性通过 `ref:"b"` 引用了b组件，b组件的 `DataA` 也是一样的效果引用了b组件。
`TestServerA` 和 `TestServerB` 分别作为处理器注册，通过接口对公共组件 a 进行了修改，启动服务器后先访问接口 `/name` 可以查看修改前 a组件Name属性 然后访问 `/update` 对a组件的Name进行修改
，最后 再次访问 `/name` 会得到修改后的结果。