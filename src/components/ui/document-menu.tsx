import { actions } from "astro:actions";
import { navigate } from "astro:transitions/client";
import { History, Pencil, CircleCheck, Trash } from "lucide-react";
import { IconButton } from "./icon-button";

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

interface DocumentMenuProps {
    id: string,
    document: string,
    version: number | null,
    translations: Record<string, string>;
};

export const DocumentMenu = ({ id, document, version, translations }: DocumentMenuProps) => {
    const versionsView = window.location.pathname.includes("versions");
    return (
        <div className="flex gap-2" onClick={event => event.preventDefault()}>
            {!versionsView
                ? <IconButton icon={History} tooltip={translations["client-history"]} onClick={() => {
                    navigate(`/docs/versions/${document}`);
                }}></IconButton>
                : version
                    ? <IconButton icon={Pencil} tooltip={translations["client-edit"]} onClick={async () => {
                        const { error } = await actions.duplicateDocument(id);
                        if (!error) setTimeout(() => navigate(""), 250);
                    }}></IconButton>
                    : <IconButton icon={CircleCheck} tooltip={translations["client-release"]} onClick={async () => {
                        const { error } = await actions.publishDocument(id);
                        if (!error) setTimeout(() => navigate(""), 250);
                    }}></IconButton>
            }
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <IconButton icon={Trash} tooltip={translations["client-delete"]}></IconButton>
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
                            const { data, error } = versionsView
                                ? await actions.deleteDocument(id)
                                : await actions.deleteDocuments(document);

                            if (data && !error) setTimeout(() => navigate(data), 250);
                        }}>
                            Continue
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};
