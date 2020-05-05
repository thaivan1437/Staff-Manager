# company-web

# Setup for web:
- State management redux hooks (done)
- Typescript config (done)
- Material UI (done)
- SASS global app (done)
- i18n Routing (done)
- Auto run tslint before commit code in gitlab with husky (done)
- Prettier (done)
- Multiple Languages (done)

# Lưu ý: 
- không đặt tên viết hoa cho file, chỉ dùng _ để đặt tên (example_file.ts).
- Định nghĩa tên các file json để translate và namespaces phải theo tên của page muốn dùng.
- Cần định nghĩa interface (type) cho action/props/state redux, mục đích chính của dùng typescript là đảm bảo data type không bị nhầm lẫn so với dùng javascript.
- Sử dụng react và redux hooks triệt để, không được dùng class tối đa.
- tên một trang cần có đuôi page.tsx

# Cách fix TSLint errors:
- no-floating-promises:
```typescript
useEffect(() => {
    void i18n.changeLanguage('vi');
  }, []);
```