// import {  } from "lucide-react"
import { FcGoogle } from "react-icons/fc";
 
import { Button } from "@/components/ui/button"
 
export function ButtonWithIcon(onClick: () => void) {
  return (
    <Button onClick={onClick} variant={"outline"} size={"mine"}>
      <FcGoogle className="mr-2 h-5 w-5" />
      Login with Google
    </Button>
  )
}