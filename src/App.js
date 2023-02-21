// mobile不支持 PDFViewer
// 解决方法 https://github.com/diegomura/react-pdf/issues/1113#issuecomment-781053667

import { useState } from 'react';
import { BlobProvider, PDFDownloadLink } from '@react-pdf/renderer';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack5';
import PDFDocument from 'src/components/PdfDocument/index';
import { isAndroid } from 'src/jsBridge';
import './App.css';
import launchTimeData from './mock/launchTime.json';
import memoryLeakData from './mock/memoryLeak.json';

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
      "launchTimeData": launchTimeData,
      "memoryLeakData": memoryLeakData,
      "locationData": {
        "count": 16,
        "totalTime": "100"
      },
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
