# Aurora

## 简介

### 版本

```go
func TestString(t *testing.T) {
	a := NewAurora()
	a.Get("/", func() string {
		return ""
	})
	a.Get("/user/{id}", func(id interface{}) interface{} {
		return id
	})
	a.Post("/user", func() string {
		return ""
	})
	Run(a)
}
```