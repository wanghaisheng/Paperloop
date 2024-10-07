import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface IconButtonProps {
    icon: React.FunctionComponent<{ className?: string }>;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    tooltip: string;
}

export const IconButton = ({ icon: Icon, onClick, tooltip }: IconButtonProps) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button size="icon" variant="ghost" className="h-6 w-6" onClick={onClick}>
                        <Icon className="h-4 w-4" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{tooltip}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};
