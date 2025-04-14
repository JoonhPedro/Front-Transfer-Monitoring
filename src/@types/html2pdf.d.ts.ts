declare module 'html2pdf.js' {
  interface Html2PdfOptions {
    margin?: number | string
    filename?: string
    image?: { type: string; quality: number }
    html2canvas?: { scale: number }
    jsPDF?: { unit: string; format: string; orientation: string }
  }

  function html2pdf(): {
    from(element: HTMLElement): {
      set(options: Html2PdfOptions): unknown
      save(filename: string): Promise<void>
    }
  }

  export default html2pdf
}
