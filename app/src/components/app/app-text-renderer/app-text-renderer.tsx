import { Box } from "@chakra-ui/react";
import * as DOMPurify from 'dompurify';

type TextRenderProps = {
    markdown: string;
}

const TextRenderer: React.FC<TextRenderProps> = ({markdown}) => {
    const safeMarkdown = DOMPurify.sanitize(markdown)
    return (
        <Box dangerouslySetInnerHTML={{__html: safeMarkdown}}></Box>
    )
}

export default TextRenderer;