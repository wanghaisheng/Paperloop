import { actions } from "astro:actions";
import { navigate } from "astro:transitions/client";
import { History, Pen, CircleCheck, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export const DocumentMenu = ({ id, version }: { id: string, version: number | null }) => {
    const versionsView = window.location.pathname.includes("versions");
    return (
        <div className="flex gap-2" onClick={event => event.preventDefault()}>
            {!versionsView
                ? <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => {
                    navigate(`/docs/${id}/versions`);
                }}>
                    <History className="h-4 w-4" />
                </Button>
                : version
                    ? <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => {
                        navigate(`/docs/${id}/versions`);
                    }}>
                        <Pen className="h-4 w-4" />
                    </Button>
                    : <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => {
                        navigate(`/docs/${id}/versions`);
                    }}>
                        <CircleCheck className="h-4 w-4" />
                    </Button>
            }
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button size="icon" variant="ghost" className="h-6 w-6">
                        <Trash className="h-4 w-4" />
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your
                            account and remove your data from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction onClick={async () => {
                            const { error } = await actions.deleteDocument(id);
                            if (!error) setTimeout(() => navigate("/docs"), 250);
                        }}>
                            Continue
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};
