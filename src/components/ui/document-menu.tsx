import { actions } from "astro:actions";
import { navigate } from "astro:transitions/client";
import { History, Trash } from "lucide-react";
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

export const DocumentMenu = ({ id }: { id: string }) => {
    return (
        <div className="flex gap-2">
            <a href={id + "/versions"}>
                <Button size="icon" variant="ghost" className="h-6 w-6">
                    <History className="h-4 w-4" />
                </Button>
            </a>
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
