# company-web
## MR requirements
- e2e test, kèm screenshots tự động 
- story book cho component
- đặt tên file và đặt vị trí file theo mẫu, đảm bảo sự thống nhất
- đảm bảo pipeline trên gitlab passed trước khi assign người review code

## Setup for web:
- State management redux hooks (done)
- Typescript config (done)
- Material UI (done)
- SASS global app (done)
- i18n Routing (done)
- Auto run tslint before commit code in gitlab with husky (done)
- Prettier (done)
- Multiple Languages (done)

## Lưu ý: 
- không đặt tên viết hoa cho file, chỉ dùng _ để đặt tên (example_file.ts).
- Định nghĩa tên các file json để translate và namespaces phải theo tên của page muốn dùng.
- Cần định nghĩa interface (type) cho action/props/state redux, mục đích chính của dùng typescript là đảm bảo data type không bị nhầm lẫn so với dùng javascript.
- Sử dụng react và redux hooks triệt để, không được dùng class tối đa.
- Tên một trang cần có đuôi page.tsx
- Khi khởi tạo function return về dạng JSX.Element thì dùng keyword: const Example = () => {}.
- Khi khởi tạo function xử lý logic bên trong thì dùng keyword: function exampleFunction() {}

## Document for e2e testing:
- Chạy test: npm run test -- -u
- Trước khi run test cần phải run trang web trước: npm run local (start:staging hoặc start:prod)
- Tên trang cần test phải có đuôi .test.ts và đặt vào page tương ứng.
- Trong quá trình chạy test, cần setup screen shot cho những nơi cần kiểm tra, tất cả các hình ảnh được chụp sẽ được lưu vào thư mục `__image_snapshots__` của mỗi folder test.
- Puppeteer api page: https://pptr.dev/#?product=Puppeteer&version=v3.0.3&show=api-class-page
- Jest api: https://jestjs.io/docs/en/api
- Jest-image-snapshot doc: https://github.com/americanexpress/jest-image-snapshot
- Example: https://blog.logrocket.com/end-to-end-testing-react-apps-with-puppeteer-and-jest-ce2f414b4fd7/

## Cách fix TSLint errors:
- no-floating-promises:
```typescript
useEffect(() => {
    void i18n.changeLanguage('vi');
  }, []);
```