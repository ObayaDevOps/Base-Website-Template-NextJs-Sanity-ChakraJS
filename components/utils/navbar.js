import {
    Box,
    Flex,
    Text,
    IconButton,
    Button,
    Stack,
    Collapse,
    Icon,
    Link,
    Popover,
    PopoverTrigger,
    PopoverContent,
    useColorModeValue,
    useBreakpointValue,
    useColorMode,
    useDisclosure,
  } from '@chakra-ui/react';

  import {
    HamburgerIcon,
    CloseIcon,
    ChevronDownIcon,
    ChevronRightIcon,
  } from '@chakra-ui/icons';

  import NextImage from 'next/image'
  import taxEdgeLogo from '../../public/images/icon/logo-black.svg'
  

  import NextLink from 'next/link'
  import { MdNightlight } from 'react-icons/md';
  import Script from 'next/script'


  
  function DarkToggleButton() {
    const { colorMode, toggleColorMode } = useColorMode()
    return (
      <header>
      <Script src="https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap" />
        <Button onClick={toggleColorMode} size='xs' fontFamily={'Space Mono'} py={-1} rounded={'none'} >
          {colorMode === 'light' ? 'Dark' : 'Light'} Mode
        </Button>
      </header>
    )
  }

  import { FaBeer } from 'react-icons/fa';
import theme from './theme';


  export default function WithSubnavigation() {
    const { isOpen, onToggle } = useDisclosure();
    const { colorMode, toggleColorMode } = useColorMode()
  
    return (
      <Box>
        <Flex
          bg={useColorModeValue('white', 'gray.800')}
          color={useColorModeValue('gray.600', 'white')}
          minH={'60px'}
          py={{ base: 2 }}
          px={{ base: 4 }}
          // borderBottom={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.900')}
          align={'center'}
          >
          <Flex
            flex={{ base: 1, md: 'auto' }}
            ml={{ base: -2 }}
            display={{ base: 'flex', md: 'none' }}>
            <IconButton
              onClick={onToggle}
              icon={
                isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
              }
              variant={'ghost'}
              aria-label={'Toggle Navigation'}
            />
          </Flex>
          <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <NextLink href='/#' passHref>
            <Link>
                <NextImage src={colorMode === 'light' ? taxEdgeLogo:  taxEdgeLogo} width={40} height={40}/>
            </Link>
          </NextLink>

            <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
              <DesktopNav />
            </Flex>
          </Flex>
  
          <Stack
            flex={{ base: 1, md: 0 }}
            justify={'flex-end'}
            direction={'row'}
            spacing={6}>
            <DarkToggleButton />
          </Stack>
        </Flex>
  
        <Collapse in={isOpen} animateOpacity>
          <MobileNav />
        </Collapse>
      </Box>
    );
  }
  
  const DesktopNav = () => {
    const linkColor = useColorModeValue('gray.600', 'gray.200');
    const linkHoverColor = useColorModeValue('gray.800', 'white');
    const popoverContentBgColor = useColorModeValue('white', 'gray.800');
    const { colorMode, toggleColorMode } = useColorMode()

  
    return (
      <Stack direction={'row'} spacing={4} paddingTop={1.5}>
        {NAV_ITEMS.map((navItem) => (
          <Box key={navItem.label}>
            <Popover trigger={'hover'} placement={'bottom-start'}>
              <NextLink href={navItem.href ?? '#'} passHref>
                <PopoverTrigger>
                  <Link
                  p={2}
                  fontSize={'sm'}
                  href={navItem.href ?? '#'}
                  fontWeight={500}
                  color={linkColor}
                  _hover={{ bg: colorMode === 'light' ? 'blue.50': 'gray.700', textColor: 'blue.400'}}
                  fontFamily={'Space Mono'}
                  >
                    {navItem.label}
                  </Link>
                </PopoverTrigger>
              </NextLink>

  
              {navItem.children && (
                <PopoverContent
                  border={0}
                  boxShadow={'xl'}
                  bg={popoverContentBgColor}
                  p={4}
                  rounded={'none'}
                  minW={'sm'}>
                  <Stack>
                    {navItem.children.map((child) => (
                      <DesktopSubNav key={child.label} {...child} />
                    ))}
                  </Stack>
                </PopoverContent>
              )}
            </Popover>
          </Box>
        ))}
      </Stack>
    );
  };
  
  const DesktopSubNav = ({ label, href, subLabel }) => {
    return (
      <NextLink href={href} passHref>
      <Link
        role={'group'}
        display={'block'}
        p={2}
        // rounded={'md'}
        _hover={{ bg: useColorModeValue('blue.50', 'gray.900') }}
        >
        <Stack direction={'row'} align={'center'}>
          <Box>
            <Text
              transition={'all .3s ease'}
              _groupHover={{ color: 'blue.400' }}
              fontWeight={500}
              fontFamily={'Space Mono'}
              _hover={{ color: 'blue.400' }}
              >
              {label}
            </Text>

            <Text fontSize={'sm'}>{subLabel}</Text>
          </Box>
          <Flex
            transition={'all .3s ease'}
            transform={'translateX(-10px)'}
            opacity={0}
            _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
            justify={'flex-end'}
            align={'center'}
            flex={1}>
            <Icon color={'blue.400'} w={5} h={5} as={ChevronRightIcon} />
          </Flex>
        </Stack>
      </Link>
      </NextLink>

    );
  };
  
  const MobileNav = () => {
    return (
      <Stack
        bg={useColorModeValue('white', 'gray.800')}
        p={4}
        display={{ md: 'none' }}>
        {NAV_ITEMS.map((navItem) => (
          <MobileNavItem key={navItem.label} {...navItem} />
        ))}
      </Stack>
    );
  };
  
  const MobileNavItem = ({ label, children, href }) => {
    const { isOpen, onToggle } = useDisclosure();
  
    return (
      <Stack spacing={4} onClick={children && onToggle}>
        <Flex
          py={2}
          as={Link}
          href={href ?? '#'}
          justify={'space-between'}
          align={'center'}
          fontFamily="Space Mono"

          _hover={{
            textDecoration: 'none',
          }}>
          <Text
            fontWeight={600}
            color={useColorModeValue('gray.600', 'gray.200')}>
            {label}
          </Text>
          {children && (
            <Icon
              as={ChevronDownIcon}
              transition={'all .25s ease-in-out'}
              transform={isOpen ? 'rotate(180deg)' : ''}
              w={6}
              h={6}
            />
          )}
        </Flex>
  
        <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
          <Stack
            mt={2}
            pl={4}
            borderLeft={1}
            borderStyle={'solid'}
            borderColor={useColorModeValue('gray.200', 'gray.700')}
            align={'start'}>
            {children &&
              children.map((child) => (
                <NextLink href={child.href} key={child.label} passHref>
                  <Link  py={2}  fontFamily="Space Mono">
                    {child.label}
                  </Link>
                </NextLink>

              ))}
          </Stack>
        </Collapse>
      </Stack>
    );
  };
  
  
  const NAV_ITEMS = [  
    {
      label: 'Tax Calculator',
      children: [
        {
          label: 'Tax Calculator',
          subLabel: 'See how much you can save today!',
          href: '/tax/tax-calculator',
        }
      ],
    },
    {
      label: 'Capital Allowance',
      children: [
        {
          label: 'About Capital Allowance',
          subLabel: 'Capital Allowance Explained',
          href: '/tax/capital-allowance',
        },
      ],
    },
    {
      label: 'R&D Tax Relief',
      children: [
        {
          label: 'About R&D Tax Relief',
          subLabel: 'R&D Tax Relief',
          href: '/tax/rd-tax-relief',
        }
      ],
    },

    {
      label: 'Case Studies',
      href: '/case-studies/case-study-1',
    },
    {
      label: 'Contact Us',
      children: [
        {
          label: 'Get in Touch',
          subLabel: 'Ask us about your tax matters today!',
          href: '/info/contact-enquiry',
        },
      ],
    },

  ];