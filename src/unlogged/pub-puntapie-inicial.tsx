import * as React from "react";
import * as ReactDOM from "react-dom";
import {useState} from "react";

import {
    AppBar, Button, IconButton,
    Link,
    List, ListItem, ListItemText, 
    SwipeableDrawer,
    Toolbar, Typography
} from "@mui/material";


// @ts-ignore 
var my=myOwn;

type Vinculo = {
    orden:number
    vinculo:string
}

type Publicacion = {
    titulo:string
    texto:string
    formato:string
    fecha:Date
    autor:string
    url:string
    vinculos:Vinculo[]
}

// @ts-ignore ejemplo_publicaciones viene sin tipo y es una global
var publicaciones:Publicacion[]=ejemplo_publicaciones.map(publicacion=>({...publicacion, fecha:new Date(publicacion.fecha)}))

function AppPrincipalOk(props:{publicaciones:Publicacion[]}){
    var [menuOpened, setMenuOpened] = useState(false);
    return <>
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu"  onClick={()=>setMenuOpened(true)}>
                    ≡
                </IconButton>
            <Typography>
                Puntapié inicial
            </Typography>
            <Button color="inherit"></Button>
            </Toolbar>
        </AppBar>
        <div className="pantalla">
        {props.publicaciones.map(publicacion=>
            <div key={publicacion.url}>
                <Typography variant="h2">
                    {publicacion.titulo}
                </Typography>
                <Typography variant="body2" className="publicacion-fecha">
                    {publicacion.fecha.toLocaleDateString()}
                </Typography>
                <Typography variant="body2" className="publicacion-autor">
                    {publicacion.autor}
                </Typography>
                {publicacion.vinculos.map(v=>(
                    <div key={v.orden} className="publicacion-vinculo">
                        <Link href={v.vinculo}>
                            {v.vinculo}
                        </Link>
                    </div>
                ))}
                <Typography variant="body1" className={"publicacion-texto publiacion-tipo-"+publicacion.formato}>
                    {publicacion.texto}
                </Typography>
            </div>
        )}
        </div>
        <div className="seccion-final"></div>
        <SwipeableDrawer  
            open={menuOpened}
            onClose={()=>setMenuOpened(false)}
            onOpen={()=>setMenuOpened(true)}
        >
            <div
                role="presentation"
                onClick={()=>setMenuOpened(false)}
                onKeyDown={()=>setMenuOpened(false)}
            >
                <List>
                    <ListItem button 
                        onClick={()=>{
                            setMenuOpened(false);
                        }}
                    >
                        <ListItemText primary="administrar" 
                            onClick={()=>{
                                window.location.href="./login"
                            }}
                        />
                    </ListItem>
               </List>
            </div>
        </SwipeableDrawer>
    </>;
}


class DmCaptureError extends React.Component<
    {children:any},
    {hasError:boolean, error:Error|{message:string}, info?:any}
>{
    constructor(props:{children:any}) {
        super(props);
        this.state = { hasError: false, error:{message:''} };
    }
    componentDidCatch(error:Error, info:any){
        this.setState({ hasError: true , error, info });
    }
    render(){
        if(this.state.hasError){
            return <>
                <Typography>Hubo un problema en la programación del dipositivo móvil.</Typography>
                <Typography>Error detectado:</Typography>
                <Typography>{this.state.error.message}</Typography>
                <Typography>{JSON.stringify(this.state.info)}</Typography>
            </>;
        }
        return this.props.children;
    }
}

function AppPrincipal(){
    return <DmCaptureError>
        <AppPrincipalOk publicaciones={publicaciones}/>
    </DmCaptureError>
}

export function mostrarPrincipal(){
    document.documentElement.setAttribute('letra','chica');
    ReactDOM.render(
        <AppPrincipal/>, 
        document.getElementById('main_layout')
    )
}

// @ts-ignore addrParams tiene un tipo que acá no importa
export async function pantallaPrincipal(_addrParams){
    mostrarPrincipal();
}

if(typeof window !== 'undefined'){
    // @ts-ignore para hacerlo
    window.pantallaPrincipal = pantallaPrincipal;
}
