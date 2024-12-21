# DESPLIEGUE EN NETLIFY
→ crear el archivo _redirects en la raiz
→ agregar el contenido : 
```
/*    /index.html   200
```

# DESPLIEGUE EN VERCEL
→ crear el archivo vercel.json en la raiz
→ agregar el contenido:
```
{
  "rewrites":[
    {
      "source":"/(.*)",
      "destination":"/"
    }
  ]
}
```

