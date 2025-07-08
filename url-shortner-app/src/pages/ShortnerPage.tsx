import { useState } from "react";
import UrlForm from "../components/UrlForm";
import UrlCard from "../components/UrlCard";
import { Log } from "../../../LoggingMiddleware/src/utils/logger";

interface Shorted { original:string; short:string; expires:string; }

export default function ShortenerPage(){
  const [results, set] = useState<Shorted[]>([])

  const handleAdd = async (_entries:any[]) => {
    const res:Shorted[] = _entries.map(e=>({
      original:e.url,
      short:window.location.origin+"/"+(e.shortcode||Math.random().toString(36).substr(2,5)),
      expires: new Date(Date.now() + (parseInt(e.valid)||30)*60000).toLocaleString()
    }))
    set(res)
    res.forEach(r => Log({ stack:"frontend", level:"info", package:"api", message:`Created ${r.short}` }))
  }

  return (
    <div>
      <UrlForm onAdd={handleAdd}/>
      {results.map((r,i)=><UrlCard key={i} {...r}/>)}
    </div>
  )
}
