/**
 * Copyright (c) 2018-present, jumpto365, Inc.
 *
 * @emails jumpto365
 * @flow
 */

import Container from 'components/Container';
import ExternalFooterLink from './ExternalFooterLink';
import FooterLink from './FooterLink';
import FooterNav from './FooterNav';
import MetaTitle from 'templates/components/MetaTitle';
import React from 'react';
import {colors, media} from 'theme';
import {sectionListCommunity, sectionListDocs} from 'utils/sectionList';

import ossLogoPng from 'images/oss_logo.png';

const Footer = ({layoutHasSidebar = false}: {layoutHasSidebar: boolean}) => (
  <footer
    css={{
      backgroundColor: colors.darker,
      color: colors.white,
      paddingTop: 10,
      paddingBottom: 50,

      [media.size('sidebarFixed')]: {
        paddingTop: 40,
      },
    }}>
    <Container>
      <div
        css={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',

          [media.between('small', 'medium')]: {
            paddingRight: layoutHasSidebar ? 240 : null,
          },

          [media.between('large', 'largerSidebar')]: {
            paddingRight: layoutHasSidebar ? 280 : null,
          },
          [media.between('largerSidebar', 'sidebarFixed', true)]: {
            paddingRight: layoutHasSidebar ? 380 : null,
          },
        }}>
        <div
          css={{
            flexWrap: 'wrap',
            display: 'flex',

            [media.lessThan('large')]: {
              width: '100%',
            },
            [media.greaterThan('xlarge')]: {
              width: 'calc(100% / 3 * 2)',
              paddingLeft: 40,
            },
          }}>
          <FooterNav layoutHasSidebar={layoutHasSidebar}>
            <MetaTitle onDark={true}>Docs</MetaTitle>
            {sectionListDocs.map(section => {
              const defaultItem = section.items[0];
              return (
                <FooterLink
                  to={`/docs/${defaultItem.id}.html`}
                  key={section.title}>
                  {section.title}
                </FooterLink>
              );
            })}
          </FooterNav>
          <FooterNav layoutHasSidebar={layoutHasSidebar}>
            <MetaTitle onDark={true}>Channels</MetaTitle>
            {/* <ExternalFooterLink
              href="https://github.com/facebook/react"
              target="_blank"
              rel="noopener">
              GitHub
            </ExternalFooterLink> */}
            <ExternalFooterLink
              href="https://jumpto365.zendesk.com/hc/en-us"
              target="_blank"
              rel="noopener">
             Help &  Support
            </ExternalFooterLink>
            {/* <ExternalFooterLink
              href="https://discuss.reactjs.org"
              target="_blank"
              rel="noopener">
              Discussion Forum
            </ExternalFooterLink> */}

            <ExternalFooterLink
              href="https://www.facebook.com/jumpto365"
              target="_blank"
              rel="noopener">
              Facebook
            </ExternalFooterLink>
            <ExternalFooterLink
              href="https://twitter.com/jumpto365"
              target="_blank"
              rel="noopener">
              Twitter
            </ExternalFooterLink>
          </FooterNav>
          {/* <FooterNav layoutHasSidebar={layoutHasSidebar}>
            <MetaTitle onDark={true}>Community</MetaTitle>
            {sectionListCommunity.map(section => (
              <FooterLink
                to={`/community/${section.items[0].id}.html`}
                key={section.title}>
                {section.title}
              </FooterLink>
            ))}
          </FooterNav> */}
          <FooterNav layoutHasSidebar={layoutHasSidebar}>
            <MetaTitle onDark={true}>More</MetaTitle>
            <FooterLink to="/tutorial/tutorial.html">Tutorial</FooterLink>
            {/* <FooterLink to="/blog/">Blog</FooterLink>
            <FooterLink to="/acknowledgements.html">
              Acknowledgements
            </FooterLink> */}

            
            <ExternalFooterLink
              href="https://medium.com/jumpto365"
              target="_blank"
              rel="noopener">
              Blog
            </ExternalFooterLink>
          </FooterNav>
        </div>
        <section
          css={{
            paddingTop: 40,
            display: 'block !important', // Override 'Installation' <style> specifics

            [media.greaterThan('xlarge')]: {
              width: 'calc(100% / 3)',
              order: -1,
            },
            [media.greaterThan('large')]: {
              order: -1,
              width: layoutHasSidebar ? null : 'calc(100% / 3)',
            },
            [media.lessThan('large')]: {
              textAlign: 'center',
              width: '100%',
              paddingTop: 40,
            },
          }}>
          <a
            href="https://jumpto365.com/en"
            target="_blank"
            rel="noopener">
            <img
              alt="jumpto365"
              css={{
                maxWidth: 160,
                height: 'auto',
              }}
              src={ossLogoPng}
            />
          </a>
          <p
            css={{
              color: colors.subtleOnDark,
              paddingTop: 15,
            }}>
            {`Copyright © ${new Date().getFullYear()} jumpto365 Inc.`}
          </p>
        </section>
      </div>
    </Container>
  </footer>
);

export default Footer;
