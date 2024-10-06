import { actions } from "astro:actions";
import { navigate } from "astro:transitions/client";
import { Ellipsis, History, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export const DocumentMenu = ({ id }: { id: string }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size="icon" variant="ghost" className="h-6 w-6">
                    <Ellipsis className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>
                    Options
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <a href={id + "/versions"}>
                    <DropdownMenuItem className="cursor-pointer">
                        <History className="mr-2 h-4 w-4" />
                        Versions
                    </DropdownMenuItem>
                </a>
                <DropdownMenuItem onClick={async () => {
                    const { error } = await actions.deleteDocument(id);
                    if (!error) navigate("/docs");
                }}>
                    <Trash className="mr-2 h-4 w-4" />
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
