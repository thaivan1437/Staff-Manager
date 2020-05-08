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

# Document for e2e testing:
- Chạy test: npm run test
- Trước khi run test cần phải run trang web trước: npm run local (start:staging hoặc start:prod)
- Tên trang cần test phải có đuôi .test.ts và đặt vào page tương ứng.
- Puppeteer api page: https://pptr.dev/#?product=Puppeteer&version=v3.0.3&show=api-class-page
- Jest api: https://jestjs.io/docs/en/api
- Example: https://blog.logrocket.com/end-to-end-testing-react-apps-with-puppeteer-and-jest-ce2f414b4fd7/

# Cách fix TSLint errors:
- no-floating-promises:
```typescript
useEffect(() => {
    void i18n.changeLanguage('vi');
  }, []);
```