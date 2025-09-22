import { Flame, Mountain, Waves, Home, BookOpen, Play } from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronRight } from "lucide-react"

const disasters = [
  {
    title: "Fire Safety",
    icon: Flame,
    path: "/fire",
    description: "Learn escape routes and fire suppression"
  },
  {
    title: "Earthquake Response", 
    icon: Mountain,
    path: "/earthquake",
    description: "Drop, cover, and hold techniques"
  },
  {
    title: "Flood Survival",
    icon: Waves, 
    path: "/flood",
    description: "Water safety and evacuation protocols"
  }
]

export function AppSidebar() {
  const { state } = useSidebar()
  const location = useLocation()
  const currentPath = location.pathname

  const isActive = (path: string) => currentPath.startsWith(path)
  const isCollapsed = state === "collapsed"

  return (
    <Sidebar className={isCollapsed ? "w-16" : "w-72"}>
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <NavLink to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-emergency-fire to-accent rounded-lg flex items-center justify-center">
            <Flame className="w-5 h-5 text-white" />
          </div>
          {!isCollapsed && (
            <div>
              <h2 className="font-bold text-lg text-sidebar-foreground">DMG Control</h2>
            </div>
          )}
        </NavLink>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-emergency-warning font-semibold">
            Disaster Training
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink 
                    to="/" 
                    className={`flex items-center gap-3 ${currentPath === "/" ? "bg-sidebar-accent text-sidebar-primary font-medium" : ""}`}
                  >
                    <Home className="w-4 h-4" />
                    {!isCollapsed && <span>Home</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {disasters.map((disaster) => (
                <Collapsible key={disaster.title}>
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton className="w-full justify-between">
                        <div className="flex items-center gap-3">
                          <disaster.icon className="w-4 h-4" />
                          {!isCollapsed && <span>{disaster.title}</span>}
                        </div>
                        {!isCollapsed && <ChevronRight className="w-4 h-4" />}
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    {!isCollapsed && (
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton asChild>
                              <NavLink 
                                to={`${disaster.path}/quiz`}
                                className={({ isActive }) => 
                                  `flex items-center gap-3 ${isActive ? "bg-sidebar-accent text-sidebar-primary font-medium" : ""}`
                                }
                              >
                                <BookOpen className="w-4 h-4" />
                                <span>Quiz</span>
                              </NavLink>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton asChild>
                              <NavLink 
                                to={`${disaster.path}/simulation`}
                                className={({ isActive }) => 
                                  `flex items-center gap-3 ${isActive ? "bg-sidebar-accent text-sidebar-primary font-medium" : ""}`
                                }
                              >
                                <Play className="w-4 h-4" />
                                <span>Simulation</span>
                              </NavLink>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    )}
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}