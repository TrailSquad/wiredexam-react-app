// mobile不支持 PDFViewer
// 解决方法 https://github.com/diegomura/react-pdf/issues/1113#issuecomment-781053667

import { useState } from 'react';
import { BlobProvider, PDFDownloadLink } from '@react-pdf/renderer';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack5';
import PDFDocument from 'src/components/PdfDocument/index';
import { isAndroid } from 'src/jsBridge';
import './App.css';

function App() {
  const [totalPageNumber, settotalPageNumber] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);

  // TODO: performanceData应该从一个拆分出的数据获取模块中获取
  // 此处仅是暂时mock
  const [performanceData, setPerformanceData] = useState(
    {
      "appName": 'Confirm',
      "version": 'iOS 15.0',
      "fps": {
        "xValues": [12.1, 12.2, 12.3, 12.4, 12.5, 12.6, 12.7],
        "data": [120, 200, 150, 80, 70, 110, 130]
      },
      "network": null,
      "launchTimeData": [
        { "launchCost": 634.1853141784668, "time": 1675749832.6170192, "uid": "29A97201-ED1F-4CA5-8038-A50491971D5A" },
        { "launchCost": 957.8750133514404, "time": 1675752513.81334, "uid": "ADA9B0D2-011A-40DE-B3BB-32B74B172FDD" },
        { "time": 1675752937.5307322, "launchCost": 955.2702903747559, "uid": "9CCB6A65-4BE1-4B67-9321-EAD1FCCD5CC1" },
        { "launchCost": 884.7908973693848, "uid": "9F71BE29-9830-4C88-AC3A-610E36DB08FB", "time": 1675753754.349119 },
        { "uid": "14700B8D-5F9C-484C-B37E-EB6F1B31561C", "launchCost": 1038.2142066955566, "time": 1675754323.075611 },
        { "uid": "8731552C-24CF-402F-BC79-344F6B427059", "launchCost": 1311.4709854125977, "time": 1675757081.83938 },
        { "launchCost": 1076.0631561279297, "uid": "C87750C2-8037-463C-BEF2-61EC6258DC7C", "time": 1675763131.618493 },
        { "time": 1675763226.579802, "launchCost": 625.1590251922607, "uid": "E7B6A924-9407-4AA9-BEC6-F6FBED39032F" },
        { "uid": "A514050D-122B-4D68-ABE4-2412756F8485", "time": 1675763450.24312, "launchCost": 565.3059482574463 }
      ],
    }
  )

  window.setupWebViewJavascriptBridge(bridge => {
    bridge.registerHandler("testJavascriptHandler", (data, responseCallback) => {
      console.log('called testJavascriptHandler with', data);
      setPerformanceData(isAndroid ? JSON.parse(data) : data);
      responseCallback({ 'Javascript received': data });
    });
  });

  const handleLoadSuccess = (pdf) => {
    settotalPageNumber(pdf.numPages);
  }

  // 上一页
  const goPrevPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  }

  // 下一页
  const goNextPage = () => {
    if (pageNumber < totalPageNumber) {
      setPageNumber(pageNumber + 1);
    }
  }

  const document = <PDFDocument performanceData={performanceData} />;

  return (
    <div className="App">
      {/* 工具栏 */}
      <div className='toolbar'>
        <button onClick={goPrevPage}>上一页</button>
        <button onClick={goNextPage}>下一页</button>
      </div>
      {/* PDF预览 */}
      <div className="pdf-view-container" id="pdf-view-container">
        <BlobProvider
          document={document}>
          {({ blob, url, loading }) => {
            return loading ? 'loading' : (
              <Document
                file={url}
                onLoadSuccess={(pdf) => handleLoadSuccess(pdf)}
                renderMode="canvas">
                <Page
                  pageNumber={pageNumber}
                  width={window.innerWidth - 20} />
              </Document>
            )
          }}
        </BlobProvider>
      </div>
      {/* 下载 */}
      <div className='download-container'>
        <PDFDownloadLink
          style={{ color: "#fff" }}
          document={document}>
          {({ loading }) =>
            loading ? 'Loading...' : '下载该pdf'
          }
        </PDFDownloadLink>
      </div>
    </div>
  );
}

export default App;
