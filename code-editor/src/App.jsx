import Editor from "./components/Editor"
import { useState, useEffect } from "react"
import useLocalStorage from "./components/useLocalStorage"


function App() {
  const [html, setHtml] = useLocalStorage('html','')
  const [css, setCss] = useLocalStorage('css','')
  const [javaScript, setJavaScript] = useLocalStorage('javaScript','')
  const [srcDoc, setSrcDoc] = useState('')

  useEffect(() => {
    const timeOut = setTimeout(() => {
        setSrcDoc(`
        <html>
        <body>${html}</body>
        <style>${css}</style>
        <script>${javaScript}</script>
        </html>
  `)
    }, 250)
    return () => clearTimeout(timeOut)
  }, [html, css, javaScript])


  return (
    <>
     <div className="pane top-pane">
      <Editor displayName="HTML" 
      language="xml" 
      value={html} 
      onChange={setHtml}/>
      <Editor
      displayName="CSS"
      language="css"
      value={css}
      onChange={setCss}
      />
      <Editor
      displayName="JS"
      language="javascript"
      value={javaScript}
      onChange={setJavaScript}
      />
     </div>
     <div className="pane">
      <iframe 
      srcDoc={srcDoc}
      title="output"
       sandbox="allow-scripts"
       width={100}
       height={100}
       frameBorder={0}
      />
     </div>
    </>
  )
}

export default App
