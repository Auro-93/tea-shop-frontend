import {createContext, useState} from 'react';

export const SidebarContext = createContext();

export const SidebarProvider = ({children}) => {

    const[isSidebarOpen, setIsSidebarOpen] = useState(false);

    document.addEventListener('click', (e) => {

        const layer = document.querySelector('#layer');
        if(e.target === layer){
            setIsSidebarOpen(false)
        }

    })

  
    return(
       <SidebarContext.Provider
        value = {
            {
                sidebar : [isSidebarOpen, setIsSidebarOpen]
            }  
        }

       >
           {children}

       </SidebarContext.Provider>
    )
}