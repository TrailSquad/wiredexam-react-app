import { useContext } from 'react';
import ContentsContext from 'src/context/ContentsContext';

/**
 * search the index of section.
 *
 * @param {string} key - The key of the CONTENT_ITEMS.
 * @returns {number} The index of section
 */

const useSectionIndex = (key) => {
  const contents = useContext(ContentsContext);
  const sectionIndex = contents.find((i) => i.key === key)?.index;
  return sectionIndex;
};

export default useSectionIndex;