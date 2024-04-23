export default defineAppConfig({
    ui: {
        notifications: {
          position: 'top-0 bottom-auto'
        },
        horizontalNavigation:{
          active:'after:bg-orange-500 dark:after:bg-orange-400'
        },
        modal:{
          container:'items-start'
        },
        progress:{
          indicator:{
            color:'dark:text-white'
          }
        },
        accordion:{
          default:{
            class:'h-12 mb-4 text-lg',
          },
          item:{
            size:'text-md'
          }
        },
        table:{
          th:{
            base: 'text-center rtl:text-center'
          },
          td:{
            base: 'text-center rtl:text-center'
          }
        }
      }
  })