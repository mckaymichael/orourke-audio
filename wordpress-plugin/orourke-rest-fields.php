<?php
/**
 * Plugin Name: O'Rourke Audio REST Fields
 * Description: Exposes the featured image URL directly on portfolio and service items, so the headless React frontend never depends on WordPress attachment read permissions.
 * Version:     1.0.0
 * Author:      O'Rourke Audio
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * WHY THIS PLUGIN EXISTS
 *
 * WordPress will not serve an attachment through the public REST API when that
 * attachment's parent post is trashed or unpublished, and an attachment's
 * parent is simply whichever post it was first uploaded from. So an image
 * uploaded while drafting one piece, then reused as the featured image on a
 * different piece, comes back as `rest_forbidden` to logged-out visitors. The
 * `_embed` payload hands the frontend an error object instead of a URL and the
 * thumbnail silently disappears, while wp-admin still looks perfectly correct.
 *
 * get_the_post_thumbnail_url() reads the URL server side, where no attachment
 * read permission applies, so the thumbnail is always returned regardless of
 * what state its parent post is in.
 *
 * The frontend (posterFor() in src/hooks/usePortfolio.js) prefers
 * `featured_image_url` when present and falls back to `_embed` when it is not,
 * so this plugin is safe to activate or deactivate at any time with no code
 * change on the React side.
 */
add_action(
	'rest_api_init',
	function () {
		foreach ( array( 'portfolio', 'service', 'post', 'page' ) as $post_type ) {
			register_rest_field(
				$post_type,
				'featured_image_url',
				array(
					'get_callback' => function ( $post ) {
						$url = get_the_post_thumbnail_url( $post['id'], 'large' );
						return $url ? $url : null;
					},
					'schema'       => array(
						'description' => 'Public URL of the featured image, resolved server side.',
						'type'        => array( 'string', 'null' ),
						'context'     => array( 'view', 'edit' ),
					),
				)
			);
		}
	}
);
