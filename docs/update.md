# 更新日志

## 2022-7-13 (tag v1.0.1)
更新 `Aurora` golang 最低支持版本兼容致 go1.16 ，版本号请切换到 v0.5.0.1

## 2022-7-15 (tag v1.0.2)
### 新功能
- 新增系统处理器参数注册
示例:
```go
type Ccc struct {
	Name string
}
func TestAurora(t *testing.T) {
	a := aurora.NewAurora()
	/// 注册一个系统变量，类型为 *Ccc
	a.SysVariable(&Ccc{}, func(proxy *aurora.Proxy) interface{} {
	    // 更具使用情况 对变量进行初始化并且返回
		c := &Ccc{"test"}
		return c
	})
	// 执行处理 ccc 是通过自定义的方式初始化好的
	a.Get("/", func(ccc *Ccc, req *http.Request) {
		fmt.Println(ccc)
	})
	aurora.Run(a)
} 
```

- 结构体控制器的初始化时机变更到 ioc 初始化期间
- ioc 初始化期间支持类型匹配注入，未找到对应匹配类型不做任何处理
- ioc 初始化对组件属性已存在赋值的项不在进行初始化注入

### bug 修复
- 系统变量， `*http.Request` , `http.ResponseWritre` , `aurora.Ctx` , `*aurora.MultipartFile` 初始化为空 

## 2022-7-18 (tag v1.0.3)
添加系统参数的类型校验检查，修复 错误捕捉的类型判断
