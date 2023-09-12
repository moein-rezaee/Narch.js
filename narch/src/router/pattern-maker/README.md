   :*
   [action]
   [action=*]
   change old route

   [controller]
   [controller=*]
   text
   new route

   controllerPattern

  
   -- METHOD:controllerPattern
   -- METHOD:controllerPattern/:id
   -- METHOD:controllerPattern/:id/:text

   :id
   -- METHOD:controllerPattern/:id

   [action]/:id
   -- METHOD:controllerPattern/actionName/:id

   [action=*]/:id
   -- METHOD:controllerPattern/actionNewName[*]/:id

   text/:id
   -- METHOD:text
   -- METHOD:text/:id
   -- METHOD:text/:id/:text

   text/[action]/:id
   -- METHOD:text/actionName
   -- METHOD:text/actionName/:id
   -- METHOD:text/actionName/:id/:text

   text/[action=*]/:id
   -- METHOD:text/actionNewName[*]
   -- METHOD:text/actionNewName[*]/:id
   -- METHOD:text/actionNewName[*]/:id/:text

   text/[controller]/:id
   text/[controller=*]/:id
   text/[controller]/[action]/:id
   text/[controller=*]/[action=*]/:id