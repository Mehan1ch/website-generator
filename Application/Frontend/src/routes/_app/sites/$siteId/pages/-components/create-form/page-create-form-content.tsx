import {CardContent} from "@/components/ui/card.tsx";
import {
    Choicebox,
    ChoiceboxItem,
    ChoiceboxItemContent,
    ChoiceboxItemDescription,
    ChoiceboxItemHeader,
    ChoiceboxItemIndicator,
    ChoiceboxItemTitle
} from "@/components/ui/choicebox.tsx";

type PageCreateFormContentProps = {
    contentOptions: {
        id: string;
        label: string;
        description: string;
    }[];
    selectedContentOption: string;
    setSelectedContentOption: (optionId: string) => void;
}


export const PageCreateFormContent = ({
                                          contentOptions,
                                          selectedContentOption,
                                          setSelectedContentOption
                                      }: PageCreateFormContentProps) => {
    return <CardContent>
        <Choicebox defaultValue={selectedContentOption}>
            {contentOptions.map((option) => (
                <ChoiceboxItem key={option.id} value={option.id} onClick={() => {
                    setSelectedContentOption(option.id);
                }}>
                    <ChoiceboxItemHeader>
                        <ChoiceboxItemTitle>
                            {option.label}
                        </ChoiceboxItemTitle>
                        <ChoiceboxItemDescription>
                            {option.description}
                        </ChoiceboxItemDescription>
                    </ChoiceboxItemHeader>
                    <ChoiceboxItemContent>
                        <ChoiceboxItemIndicator/>
                    </ChoiceboxItemContent>
                </ChoiceboxItem>
            ))}
        </Choicebox>
    </CardContent>;
};